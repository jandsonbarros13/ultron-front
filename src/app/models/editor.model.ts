export interface Editor {
  id?: number;
  nome: string;
  comando: string;
  caminho: string;
  icon?: string;
  selected: boolean | number;
}

export const NovoEditorPadrao = (): Editor => ({
  nome: '',
  comando: '',
  caminho: '',
  icon: 'code-slash-outline',
  selected: false
});