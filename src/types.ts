export type PropsTab = {
    EPI: {
        newEpi?:
            | {
                  nome: string;
                  dataSolicitacao: string;
                  quantidade: string;
                  validade: string;
                  imagem: string;
                  tamanho: string;
                  idCard: string;
                  status: string;
                  nomeDisplay: string;
              }
            | undefined;
    };
    Equipamento: {
        newEquipamento?:
            | {
                  nome: string;
                  dataSolicitacao: string;
                  quantidade: string;
                  validade: string;
                  imagem: string;
                  problema: string;
                  idCard: string;
                  status: string;
                  nomeDisplay: string;
              }
            | undefined;
    };
    Holerite: undefined;
    CheckList: undefined;
};

export type PropsStack = PropsTab & {
    SolicitarEpi: undefined;
    SolicitarEquipamento: undefined;
    HoleriteTabs: undefined;
    Login: undefined;
    EsqueceuSenha: undefined;
    PrimeiroAcesso: undefined;
    Credencial: {    
        cpf: string;
        matricula: string;}
    Verificacao:{
        matricula: string
    };
    AlterarSenha: {
        matricula: string;
        code: string;
    };
    SenhaRedefinida: undefined;
    Foto: undefined;
    ChecklistUsuario: undefined;
    Home: undefined

};

export type EpiDataType = {
    nome: string;
    dataSolicitacao: string;
    quantidade: string;
    validade: string;
    imagem: string;
    tamanho: string;
    idCard: string;
    status: string;
    nomeDisplay: string;
};

export type RouteNames =
    | "SolicitarEpi"
    | "SolicitarEquipamento"
    | "HoleriteTabs"
    | "Login"
    | "EsqueceuSenha"
    | "PrimeiroAcesso"
    | "Credencial"
    | "Verificacao"
    | "AlterarSenha" 
    | "SenhaRedefinida"
    | "Foto";
