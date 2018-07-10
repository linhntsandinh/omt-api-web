package services

import javax.inject.Inject
import models.{UserRole, UserRoleForm}

import scala.concurrent.Future

class UserRoleService @Inject()(user: UserRole) {
  def insert(userRoleForm: UserRoleForm): Future[String] = user.insert(userRoleForm)
  def delete(userRoleId: Int): Future[Int] = user.delete(userRoleId)
  def deleteByUserId(userId: Int): Future[Int] = user.delete(userId)
}
