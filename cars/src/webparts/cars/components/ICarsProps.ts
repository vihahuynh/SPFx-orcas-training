interface Picture {
  Url: string,
  Description: string
}

interface Brand {
  Title: string
}

interface Tag {
  Label: string,
  TermGuid: string,
  WssIs: number
}

export interface Car {
  Brand: Brand
  ID: number,
  Title: string,
  BrandId: number,
  Price: number,
  Color: string,
  Tags: Tag[],
  Description: string,
  Picture: Picture,
}

export interface ICarsProps {
  cars: Car[],
  brand: string,
  description: string,
  isDarkTheme: boolean;
  environmentMessage: string,
  hasTeamsContext: boolean,
  userDisplayName: string,
  
}
