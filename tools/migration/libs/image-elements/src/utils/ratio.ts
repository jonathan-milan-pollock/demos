import { round } from './round';

// return two decimal places rounded number
export const ratio = ({ width, height }: any) => round(width / height, 2);
