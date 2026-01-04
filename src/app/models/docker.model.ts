export interface DockerContainer {
  id: string;
  image: string;
  name: string;
  status: string;
  state: 'running' | 'exited' | 'paused' | 'restarting' | string; 
}