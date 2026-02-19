#!/bin/bash

echo "🚀 Starting Nawah API (port 5000)..."
cd ~/nawah-core
# تشغيل API في الخلفية
node server.js > api.log 2>&1 &
API_PID=$!
echo "✅ Nawah API PID: $API_PID"

sleep 2

echo "🚀 Starting Nawah Agent Layer (port 6000)..."
cd ~/nawah-core/nawah-agent-layer
# تشغيل Agent Layer في الخلفية
node server.js > agent.log 2>&1 &
AGENT_PID=$!
echo "✅ Nawah Agent Layer PID: $AGENT_PID"

sleep 2

echo "🌐 Testing connections..."
# اختبار API
echo "⏳ Checking Nawah API..."
API_RESPONSE=$(curl -s http://127.0.0.1:5000/api/users)
if [ -z "$API_RESPONSE" ]; then
  echo "❌ Nawah API not responding"
else
  echo "✅ Nawah API response: $API_RESPONSE"
fi

# اختبار Agent
echo "⏳ Checking Agent Layer..."
AGENT_RESPONSE=$(curl -s http://127.0.0.1:6000/test-api)
if [ -z "$AGENT_RESPONSE" ]; then
  echo "❌ Agent Layer not responding"
else
  echo "✅ Agent Layer response: $AGENT_RESPONSE"
fi

echo ""
echo "ℹ️ Logs: api.log (Nawah API), agent.log (Agent Layer)"
echo "🔹 Stop servers with: kill $API_PID $AGENT_PID"
