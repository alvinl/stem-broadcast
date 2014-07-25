Stem Broadcast
===================
A Stem plugin that allows you to broadcast a message to everyone on the bots friends list. It also allows you to cluster multiple bots to relay a message to all bots connected to the cluster.

### Installation

1. `npm install git://github.com/alvinl/stem-broadcast.git`
2. Add `"stem-broadcast": {}` to plugins.json

### Commands

- `broadcast <message>` Broadcast a message to the bots friends and to the cluster

### Config

```json
{

  "stem-broadcast": {

    "redisHost": "localhost",
    "redisPort":  7878,
    
    "cluster": "broadcast"

  }

}

```

- `redisHost` Redis host to connect to
- `redisPort` Redis port to connect to
- `cluster` Redis channel name to act as a cluster (defaults to 'broadcast')