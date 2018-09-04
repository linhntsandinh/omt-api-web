package models

import javax.inject.Inject
import be.objectify.deadbolt.scala.models.Subject
import controllers.ProfileController
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import security.{SecurityPermission, SecurityRole}
import services.ProfileService

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import utils.JS

import scala.collection.mutable.ListBuffer

case class LoginForm(username: String, password: String)
object LoginForm {
  implicit val reader = Json.reads[LoginForm]
}

case class UserForm(id: Int, username: String, password: String, email: String, avatar: String, holidayRemaining: Float, status: Int, update_by: Option[Int], create_by: Option[Int])
object UserForm {
  implicit val reader = Json.reads[UserForm]
  implicit val writer = Json.writes[UserForm]
}

case class UserData(id: Int, username: String, password: String, email: String, avatar: String, holidayRemaining: Float, status: Int, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Int], updated_by: Option[Int])
object UserData {
  implicit val reader = Json.reads[UserData]
  implicit val writer = Json.writes[UserData]
}

class UserTableDef(tag: Tag) extends Table[UserData](tag, "users") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def username = column[String]("username")
  def password = column[String]("password")
  def email = column[String]("email")
  def avatar = column[String]("avatar")
  def holidayRemaining = column[Float]("holiday_remaining")
  def status = column[Int]("status")
  def created_at = column[Option[Long]]("created_at")
  def updated_at = column[Option[Long]]("updated_at")
  def created_by = column[Option[Int]]("created_by")
  def updated_by = column[Option[Int]]("updated_by")
  override def * =
    (id, username, password, email, avatar, holidayRemaining, status, created_at, updated_at, created_by, updated_by) <>((UserData.apply _).tupled, UserData.unapply)
}

class UserAuth(username: String, roleList: List[SecurityRole], permissionList: List[SecurityPermission]) extends Subject {
  override def roles: List[SecurityRole] = roleList

  override def permissions: List[SecurityPermission] = permissionList

  override def identifier: String = username
}

class User @Inject()(Profile : ProfileService, protected val dbConfigProvider: DatabaseConfigProvider)
                    (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val UserTable = TableQuery[UserTableDef]

  def getAuthInfo(username: String) = {
    val role = TableQuery[RoleTableDef]
    val permission = TableQuery[PermissionTableDef]
    val userRole = TableQuery[UserRoleTableDef]
    val rolePermission = TableQuery[RolePermissionFormDef]
    val profileTable = TableQuery[ProfileTableDef]
    val jobTitle = TableQuery[TitleTableDef]
    val jobPoss = TableQuery[JobPositionDef]
    val department = TableQuery[DepartmentTableDef]
    val q = (((((UserTable join userRole on (_.id === _.userId)
      join role on (_._2.roleId === _.id)
      join rolePermission on (_._1._2.roleId === _.roleId)
      join permission on (_._2.permissionId === _.id))
      join profileTable on(_._1._1._1._1.id === _.user_id))
      join jobTitle on (_._2.job_title_id === _.id))
      join jobPoss on (_._1._2.job_position_id === _.id))
      join department on(_._1._1._2.department_id === _.id))
      .filter(_._1._1._1._1._1._1._1._1.username === username).result
    q.statements.foreach(println) // print query
    val rs = db.run {
      q
    }

    rs.map {
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val username = list.head._1._1._1._1._1._1._1._1.username
            val roles = ListBuffer.empty[SecurityRole]
            val permissions = ListBuffer.empty[SecurityPermission]
            list.foreach {
              item => {
                val ((((((((user, userRole), role), rolePermission), permission), profile), jobtitle), jobposs), department)= item
                roles += SecurityRole(role.code)
                permissions += SecurityPermission(permission.code)
              }

            }
            println(permissions)
            Some(list.head._1._1._1._1._1._1._1._1, permissions,list.head._1._1._1._2,list.head._1._1._2,list.head._1._2,list.head._2)
          }
        }

      }
    }
  }

  def insert(userData: UserData) = {
    val q = UserTable.filter(_.username === userData.username).result
    val rs = db.run(q)
    rs.flatMap { l =>
      l.size match {
        case 0 => db.run(UserTable returning UserTable.map(_.id) += userData).flatMap { id =>
            val profileForm = new ProfileForm(Some(1), id, "", "", "1-1-1997", "", 0, 0, 0, 1, "1-1-1997", 1, userData.created_by)
            Profile.insert(profileForm).map(rs => id)
          }
        case _ => Future(0)
      }
    }
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
