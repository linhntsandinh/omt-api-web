
package services

import javax.inject.Inject
import models._
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class RolePermissionService @Inject()(rolePermission: RolePermission){
  def deleteByRoleId(roleId: Int)= rolePermission.deleteByRoleId(roleId)
  def insert(rolePermissionForm: RolePermissionForm) = {
    val rolePermissionData = new RolePermissionData(1,rolePermissionForm.roleId,rolePermissionForm.permissionId)
    rolePermission.insert(rolePermissionData)
    Future(JS.OK("data" -> "insert Success!!"))
  }
  def update(rolePermissionData: RolePermissionData) = {
    rolePermission.update(rolePermissionData)
  }
}
