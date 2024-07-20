export interface City  {
    ProvinceID: number;
    ProvinceName: string;
    CountryID: number;
    Code: string;
    NameExtension: string[];
    IsEnable: number;
    RegionID: number;
    RegionCPN: number;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    CanUpdateCOD: boolean;
    Status: number;
  }

  export interface District  {
    DistrictID: number;
    ProvinceID: number;
    DistrictName: string;
    Code: string;
    Type: number;
    SupportType: number;
    NameExtension: string[];
    IsEnable: number;
    CanUpdateCOD: boolean;
    Status: number;
    PickType: number;
    DeliverType: number;
    WhiteListClient: {
        From: number[];
        To: number[];
        Return: number[];
    };
    WhiteListDistrict: {
        From: any;
        To: any;
    };
    ReasonCode: string;
    ReasonMessage: string;
    OnDates: any;
    CreatedIP: string;
    CreatedEmployee: number;
    CreatedSource: string;
    CreatedDate: string;
    UpdatedEmployee: number;
    UpdatedDate: string;
  }
  
  export interface Ward  {
    WardCode: string;
    DistrictID: number;
    WardName: string;
    NameExtension: string[];
    CanUpdateCOD: boolean;
    SupportType: number;
    PickType: number;
    DeliverType: number;
    WhiteListClient: {
        From: number[];
        To: number[];
        Return: number[];
    };
    WhiteListWard: {
        From: any;
        To: any;
    };
    Status: number;
    ReasonCode: string;
    ReasonMessage: string;
    OnDates: string[];
    CreatedIP: string;
    CreatedEmployee: number;
    CreatedSource: string;
    CreatedDate: string;
    UpdatedEmployee: number;
    UpdatedDate: string;
  }