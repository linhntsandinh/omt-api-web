package services

import javax.inject.Inject
import models.{UserRole, UserRoleData, UserRoleForm}
import play.api.mvc.Result

import scala.concurrent.Future

class UserRoleService @Inject()(user: UserRole) {
  def insert(userRoleForm: UserRoleForm): Future[Result] = user.insert(userRoleForm)
  def update(userRoleData: UserRoleData): Future[Int] = user.update(userRoleData)

  def delete(userRoleId: Int): Future[Int] = user.delete(userRoleId)
  def deleteByUserId(userId: Int): Future[Int] = user.delete(userId)
}
