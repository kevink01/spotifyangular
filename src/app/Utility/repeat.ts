export { getNextState };

const repeatStates: string[] = ['off', 'context', 'track'];

function getNextState(current: string): string {
  const index = repeatStates.indexOf(current);
  if (index !== -1) {
    return repeatStates[(index + 1) % repeatStates.length];
  }
  return 'off';
}
