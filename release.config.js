const config = {
    branches: ['release'],
    plugins: [
        ["@semantic-release/npm", {
            "npmPublish": false
        }],
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        ['@semantic-release/git', {
            'assets': ['package.json', 'out/*'],
            'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        }],
        ["@semantic-release/github", {
            'assets': ['package.json', 'out/make']
        }]
    ]
  };
  
  module.exports = config;