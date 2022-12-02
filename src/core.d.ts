export interface HttpResult<T> {
  code: number;
  message: string;
  data: T;
}

export interface HttpPageResult<T> {
  code: number;
  message: string;
  data: {
    limit: number;
    list: T;
    offset: number;
    total: number;
  };
}

export interface HttpPageResult2<T> {
  code: number;
  codeRemark: string;
  data: T[];
  message: string;
  totalCount: number;
  totalPage: number;
}

export interface PostItemType {
  id: string;
  postName: string;
  orgId: string;
}

export type BzTreeItemType = {
  appSysId: string;
  createTime: number;
  creator: number;
  customType: number;
  description: string;
  groupName: string;
  id: string;
  level: number;
  orderNo: number;
  parentId: string;
  treeDescription: string;
  treeId: string;
};

export interface OrgItemType {
  createTime: string;
  id: string;
  orgSort: number;
  parentId: string;
  type: string;
  name: string;
  organizationName: string;
  organizationDescription: string;
  organizationSort: number;
}

export interface DeviceItemType {
  ability: any;
  accessType: null;
  aliasBrand: null;
  appSystemId: string;
  areaLevel: number;
  bindUserid: string;
  boxNum: string;
  buzGroupId: string;
  buzGroupIds: string[];
  buzGroupName: string;
  cameraType: string;
  capDirection: string;
  cid: string;
  createTime: string;
  deleteFlag: number;
  detailLiftBuild: number;
  detailLiftUnit: number;
  deviceBrand: number;
  deviceIp: string;
  deviceModel: string;
  deviceName: string;
  devicePlace: string;
  deviceStatus: 0 | 1;
  deviceType: string;
  extJson: any;
  fullPy: string;
  gbId: string;
  geoCoordinateSystem: string;
  groupId: string;
  groupIds: string[];
  groupName: string;
  hadLocaltion: boolean;
  hasFrontEnd: boolean;
  hasStorage: boolean;
  id: string;
  inOutDirection: any;
  industry: any;
  industry1: string;
  industry2: string;
  installationLocationDetail: any;
  installationMethod: any;
  installationSite: any;
  ipAddr: any;
  ipV6Addr: any;
  isBind: any;
  isIdleDeal: any;
  latitude: number;
  longitude: number;
  maintenancePerson: any;
  maintenancePhone: any;
  maintenanceUnit: any;
  manufacturerDeviceType: string;
  monitorAreaDesc: any;
  monitorDirection: any;
  operationCenterIds: any;
  orgCode: any;
  parentId: any;
  pathId: string[];
  place: string;
  placeCode: string;
  placeId: string;
  placeIds: string[];
  placeName: null;
  placeTags: string[];
  port: string;
  ptzControl: string;
  simpPy: string;
  sn: string;
  snapshotMode: string;
  sourceFrom: string;
  superiorGbcode: string;
  tags: string;
  villageLocationType: string;
}

export type PlaceItemType = {
  areaCode: string;
  areaName: string;
  center: string;
  hasDevice: boolean;
  id: string;
  level: number;
  name: string;
  parentCode: string;
  placeId: string;
  pcodes?: Array<string>;
  provinceId: string;
  placeInfoUrl?: string;
};
