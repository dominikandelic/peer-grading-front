import { GradingStatus } from "../../api/generated";

export const statusMapper = new Map([
  ["STANDBY", "Students submit their task submissions"],
  ["STARTED", "Students grade their peers' submissions"],
  ["FINISHED", "Grading result has been published"],
]);

export const taskActionMapper = new Map<string, string>([
  ["FINISHED", "Result"],
  ["STANDBY", "Submit"],
  ["STARTED", "Grade"],
]);
