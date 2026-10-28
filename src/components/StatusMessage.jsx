export default function StatusMessage({ state, children }) {
  return <p id="status" data-state={state}>{children}</p>;
}
