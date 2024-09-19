const {
  Department,
  Employee,
  Role,
  EmployeeDepartment,
  EmployeeRole,
} = require('../models');

async function getEmployeeDepartment(employeeId) {
  const employeeDepartments = await EmployeeDepartment.findAll({
    where: { employeeId },
  });

  const departments = [];
  for (let empdep of employeeDepartments) {
    const empDepartment = await Department.findOne({
      where: { id: empdep.departmentId },
    });
    if (empDepartment) departments.push(empDepartment);
  }

  return departments;
}

async function getEmployeeRole(employeeId) {
  const employeeRoles = await EmployeeRole.findAll({
    where: { employeeId },
  });

  const roles = [];
  for (let empRole of employeeRoles) {
    const role = await Role.findOne({
      where: { id: empRole.roleId },
    });
    if (role) roles.push(role);
  }

  return roles;
}

const getEmployeeWithAssociations = async (employeeData) => {
  try {
    const departments = await getEmployeeDepartment(employeeData.id);
    const roles = await getEmployeeRole(employeeData.id);

    return {
      ...employeeData.dataValues,
      department: departments.length > 0 ? departments[0] : null,
      role: roles.length > 0 ? roles[0] : null,
    };
  } catch (error) {
    console.error('Error fetching Employee with associations:', error);
  }
};

module.exports = {
  getEmployeeWithAssociations,
  getEmployeeDepartment,
  getEmployeeRole,
};
