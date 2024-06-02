import fetch from 'node-fetch';

export default async function updateGist(
  id: string,
  description: string,
  content: string,
): Promise<boolean> {
  const response = await fetch(`https://api.github.com/gists/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      description,
      files: {
        [description]: {
          content,
        },
      },
    }),
  });

  return response.ok;
}
