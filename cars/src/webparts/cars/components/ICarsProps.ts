interface IPicture {
  Url: string,
  Description: string
}

interface IBrand {
  Title: string
}

export interface ITag {
  Label: string,
  TermGuid: string,
  WssIs: number
}

export interface ICar {
  Brand: IBrand
  ID: number,
  Title: string,
  BrandId: number,
  Price: number,
  Color: string,
  Tags: ITag[],
  Description: string,
  Picture: IPicture,
}

export interface ICarsProps {
  // cars: ICar[],
  brand: string,
  description: string,
  isDarkTheme: boolean;
  environmentMessage: string,
  hasTeamsContext: boolean,
  userDisplayName: string,
  context: any
  
}
