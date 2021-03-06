package models


import javax.inject.Inject
import be.objectify.deadbolt.scala.models.Subject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import security.{SecurityPermission, SecurityRole}

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.collection.mutable.ListBuffer

class UserAuth(username: String, roleList: List[SecurityRole], permissionList: List[SecurityPermission]) extends Subject {
  override def roles: List[SecurityRole] = roleList

  override def permissions: List[SecurityPermission] = permissionList

  override def identifier: String = username
}

class User @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                    (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val UserTable = TableQuery[UserTableDef]

  def getAuthInfo(username: String): Future[Option[(UserData, ListBuffer[SecurityPermission])]] = {
    val role = TableQuery[RoleTableDef]
    val permission = TableQuery[PermissionTableDef]
    val userRole = TableQuery[UserRoleTableDef]
    val rolePermission = TableQuery[RolePermissionFormDef]


    val q = (UserTable join userRole on (_.id === _.userId) join role on (_._2.roleId === _.id) join
      rolePermission on (_._1._2.roleId === _.roleId) join permission on (_._2.permissionId === _.id)).filter(_._1._1._1._1.username === username).result
    q.statements.foreach(println) // print query
    val rs = db.run {
      q
    }

    rs.map {
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val username = list.head._1._1._1._1.username
            val roles = ListBuffer.empty[SecurityRole]
            val permissions = ListBuffer.empty[SecurityPermission]
            list.foreach {
              item => {
                val ((((user, userRole), role), rolePermission), permission) = item
                roles += SecurityRole(role.code)
                permissions += SecurityPermission(permission.code)
              }

            }
            println(permissions)
            Some(list.head._1._1._1._1, permissions)
          }
        }

      }
    }
  }

  def insert(userData: UserData): Future[Int] = {
    db.run(UserTable += userData)
  }

  def delete(userId: Int) = {
    db.run(UserTable.filter(_.id === userId).delete)
  }

  def update(userData: UserData) = {
    val q = UserTable.filter(_.id === userData.id)
      .map(p => (p.username, p.password, p.email, p.holidayRemaining, p.updated_at))
      .update(userData.username, userData.password, userData.email, userData.holidayRemaining, userData.updated_at)
    db.run(q)
  }
}
