import { Writable } from 'stream';

import { stream } from 'undici';

async function fetchGitHubRepos() {
  const url = 'https://api.github.com/users/nodejs/repos';

  const { statusCode } = await stream(
      url,
      {
        method : 'GET',
        headers : {
          'User-Agent' : 'undici-stream-example',
          Accept : 'application/json',
        },
      },
      () => {
        let buffer = '';

        return new Writable({
          write(chunk, encoding, callback) {
            buffer += chunk.toString();

            try {
              const json = JSON.parse(buffer);
              console.log(
                  'Repository Names:',
                  json.map(repo => repo.name)
              );
              buffer = '';
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }

            callback();
          },
          final(callback) {
            console.log('Stream processing completed.');
            callback();
          },
        });
      }
  );

  console.log(`Response status: ${ statusCode }`);
}

fetchGitHubRepos().catch(console.error);
