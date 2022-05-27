module.exports = {
  branches: [
    // https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#workflow-configuration
    { name: 'main', channel: 'latest' },
  ],
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/changelog', {
      changelogTitle: '# Changelog'
    }],
    ['semantic-release-license'],
    ['@semantic-release/git', {
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\nRelease automatically generated through continuous integration.',
      assets: ['LICENSE']
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'docker build -t danielgl05/management-tools . && yarn build'
    }],
    ['@semantic-release/github', {
      assets: ['dist/*.js', './*', '!src/**', '!tests/**'],
      releasedLabels: [
        'released on @${nextRelease.channel}',
        'released on ${nextRelease.gitTag}'
      ]
    }],
    ['@semantic-release/npm', {
      prepare: true,
      publish: false
    }],
    ['semantic-release-docker', {
      name: 'danielgl05/management-tools'
    }],
    ['semantic-release-heroku', {
      name: 'management-tools',
      npmVersion: true
    }]
  ]
}
