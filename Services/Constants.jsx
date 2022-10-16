export const USER_ROLE_ENTITY_TYPE = {
  INF_ADMIN: -999,
  ABSOLUTE_YOU_ADMIN: 1,
  EMPLOYER: 2,
  EMPLOYEE: 3,
  SALES_AGENT: 4,
  LOCATION_MANAGER: 5,
}

export const USER_ENTITY_TYPE_ID = {
  administrator                  : USER_ROLE_ENTITY_TYPE.INF_ADMIN,
  absolute_you_admin_config_user : USER_ROLE_ENTITY_TYPE.ABSOLUTE_YOU_ADMIN,
  employeer                      : USER_ROLE_ENTITY_TYPE.EMPLOYER,
  employee                       : USER_ROLE_ENTITY_TYPE.EMPLOYEE,
  absolute_you_sales_agent       : USER_ROLE_ENTITY_TYPE.SALES_AGENT,
  location_manager               : USER_ROLE_ENTITY_TYPE.LOCATION_MANAGER,
}

export const salaryBenefitOccurenceOptions = [
  {label: '---Select---',     value: 0 },
  {label: 'Hour',     value: 1 },
  {label: 'Day',      value: 2 },
  {label: 'Week',     value: 3 },
  {label: 'Contract', value: 4 },
];
