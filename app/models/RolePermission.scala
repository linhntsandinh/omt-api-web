package models

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import utils.JS

/***/
case class RolePermissionData(id: Int, roleId: Int, permissionId: Int)
object RolePermissionData {
  implicit val reader = Json.reads[RolePermissionData]
  implicit val writer = Json.writes[RolePermissionData]

}
class RolePermissionTableDef(tag: Tag) extends Table[RolePermissionData](tag, "role_permissions") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def roleId = column[Int]("role_id")
  def permissionId = column[Int]("permission_id")
  override def * =
    (id, roleId, permissionId) <>((RolePermissionData.apply _).tupled, RolePermissionData.unapply)
}

/***/
case class RolePermissionForm(permissionId: Int, roleId: Int)
object RolePermissionForm {
  implicit val reader = Json.reads[RolePermissionForm]
  implicit val writer = Json.writes[RolePermissionForm]

}
class RolePermissionFormDef(tag: Tag) extends Table[RolePermissionForm](tag, "role_permissions") {
  def roleId = column[Int]("role_id")
  def permissionId = column[Int]("permission_id")
  override def * =
    (roleId, permissionId) <>((RolePermissionForm.apply _).tupled, RolePermissionForm.unapply)
}

/***/
class RolePermission @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                         (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

//  private val RolePermission  = TableQuery[RolePermissionFormDef]
  private val RolePermissionData  = TableQuery[RolePermissionTableDef]

  def insert(rolePermissionData: RolePermissionData): Future[String] = db.run(RolePermissionData += rolePermissionData).map {
    res => "User successfully added"
  }.recover{
    case ex: Exception => ex.getCause.getMessage
  }

  def deleteByRoleId(roleId: Int) = {
    db.run(RolePermissionData.filter(_.roleId === roleId).delete)
  }

  def deleteByPermissionId(permissionId: Int): Future[Int] = {
    db.run(RolePermissionData.filter(_.permissionId === permissionId).delete)
  }

  def update(rolePermissionData: RolePermissionData)={
    val q = RolePermissionData.filter(_.id === rolePermissionData.id)
      .map(p => (p.roleId,p.permissionId))
      .update((rolePermissionData.roleId,rolePermissionData.permissionId))
    db.run(q)
  }
}