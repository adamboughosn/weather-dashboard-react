import StatusMessage from './StatusMessage.jsx';

function friendly(error, city) {
  if (error.message === 'not-found') {
    return `No city called "${city}" was found. Check the spelling.`;
  }
  if (error.message.startsWith('HTTP')) {
    return `The weather service answered with an error (${error.message}). Try again shortly.`;
  }
  return "Couldn't reach the weather service. Check your connection and retry.";
}

export default function ErrorMessage({ error, city, onRetry }) {
  return (
    <>
      <StatusMessage state="error">{friendly(error, city)}</StatusMessage>
      <button type="button" onClick={onRetry}>Retry</button>
    </>
  );
}
