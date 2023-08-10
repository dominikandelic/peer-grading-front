export const statusMapper = new Map([
  ["STANDBY", "Studenti podnose svoje radove"],
  ["STARTED", "Studenti ocjenjuju radove kolega"],
  ["FINISHED", "Rezultati su objavljeni"],
]);

export const taskActionMapper = new Map<string, string>([
  ["FINISHED", "Rezultati"],
  ["STANDBY", "Podnesi"],
  ["STARTED", "Ocijeni"],
]);
