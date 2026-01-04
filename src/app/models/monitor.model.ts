export interface SystemStats {
  cpuUsage: number;
  memoryUsage: number;
  totalMemory: string;
  freeMemory: string;
  diskUsage: number;
  uptime: string;
  temp?: number;
}