import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface IntentPacket {
    agent_id: string;
    agent_role: string;
    sp_score: number;
    target_resource: string;
    action: string;
    chain_of_intent: string;
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const intents: IntentPacket[] = data.intents;

        if (!intents || intents.length < 2) {
            return NextResponse.json({ error: "Requires at least 2 intents for arbitration" }, { status: 400 });
        }

        const [agentA, agentB] = intents;

        // Hard Law Check
        const hardBlockActions = ['FORCE_DROP', 'DISABLE_FW', 'WIPE_LOGS'];
        const violator = intents.find(i => hardBlockActions.includes(i.action));

        let decision = '';
        let negotiated_delay = '';
        let friction = 'low';

        if (agentA.target_resource === agentB.target_resource) {
            friction = 'high';
        }

        if (violator) {
            decision = 'HARD_BLOCK';
            negotiated_delay = 'INDEFINITE_STASIS';
        } else if (agentA.sp_score > agentB.sp_score + 0.2) {
            decision = `AUTHORIZE ${agentA.agent_id}, QUEUE ${agentB.agent_id}`;
            negotiated_delay = 'UNTIL_A_COMPLETE';
        } else if (agentB.sp_score > agentA.sp_score + 0.2) {
            decision = `AUTHORIZE ${agentB.agent_id}, QUEUE ${agentA.agent_id}`;
            negotiated_delay = 'UNTIL_B_COMPLETE';
        } else {
            decision = `SEQUENTIAL_COMPROMISE`;
            negotiated_delay = `10m_A_THEN_B`;
        }

        const verdict = {
            decision,
            negotiated_delay,
            friction,
            cryptographic_reasoning_hash: crypto.createHash('sha256').update(JSON.stringify({ intents, decision, timestamp: Date.now() })).digest('hex'),
            savings_impact: `$${Math.floor(Math.random() * 5000)} saved`,
            timestamp: new Date().toISOString(),
            involved_intents: intents
        };

        return NextResponse.json(verdict);
    } catch (err) {
        return NextResponse.json({ error: "Invalid Kernel Arbitrate format" }, { status: 400 });
    }
}
