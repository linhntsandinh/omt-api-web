package models

import java.sql.Date
import java.text.SimpleDateFormat

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._
import slick.jdbc.JdbcProfile
import javax.inject.Inject
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.collection.mutable.ListBuffer

case class ProfileForm(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: String, address: String, departmenti_id: Int, job_title_id: Int, job_position_id: Int, status: Int, join_date: String, gender: Int, created_by: Option[Int])
object ProfileForm {
  implicit val reader = Json.reads[ProfileForm]
  implicit val writer = Json.writes[ProfileForm]
}

case class ProfileData(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: Date, address: String, departmenti_id: Int, job_title_id: Int, job_position_id: Int, status: Int, join_date: Date, gender: Int, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Int], updated_by: Option[Int])
object ProfileData {
  implicit val reader = Json.reads[ProfileData]
  implicit val writer = Json.writes[ProfileData]
}

case class Profileload(  user_id: Int, full_name: String, avatar: String,email: String)
object Profileload {
  implicit val reader = Json.reads[Profileload]
  implicit val writer = Json.writes[Profileload]
}

class ProfileTableDef(tag: Tag) extends Table[ProfileData](tag, "profiles") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def full_name = column[String]("full_name")

  def phone_number = column[String]("phone_number")

  def birth_date = column[Date]("birth_date")

  def address = column[String]("address")

  def departmenti_id = column[Int]("department_id")

  def job_title_id = column[Int]("job_title_id")

  def job_position_id = column[Int]("job_position_id")

  def status = column[Int]("status")

  def join_date = column[Date]("join_date")

  def gender = column[Int]("gender")

  def created_at = column[Option[Long]]("created_at")

  def updated_at = column[Option[Long]]("updated_at")

  def created_by = column[Option[Int]]("created_by")

  def updated_by = column[Option[Int]]("updated_by")

  override def * =
    (id, user_id, full_name, phone_number, birth_date, address, departmenti_id, job_title_id, job_position_id, status, join_date, gender, created_at, updated_at, created_by, updated_by) <> ((ProfileData.apply _).tupled, ProfileData.unapply)
}

class Profile @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val ProfileTable = TableQuery[ProfileTableDef]

  def getProfile(id: Int) = {
    val jobPosition = TableQuery[JobPositionDef]
    val jobTitle = TableQuery[TitleTableDef]
    val user = TableQuery[UserTableDef]
    val query = ((ProfileTable join jobPosition on (_.job_position_id === _.id) join jobTitle on (_._1.job_title_id === _.id)) join user on (_._1._1.id === _.id)).filter(_._1._1._1.user_id === id).result
    val rs = db.run(query)
    rs.map{
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val ((((profile, job_posistion),job_title),avatar),email) = ((list.head._1,list.head._2.avatar),list.head._2.email)
            Some(profile, job_posistion, job_title,avatar,email)
          }
        }
      }
    }
  }

  def loadProfile = {
    val user = TableQuery[UserTableDef]
    val query = ((ProfileTable join user) on (_.user_id === _.id)).result
    val rs = db.run(query)
    rs.map{
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val data = ListBuffer.empty[Profileload]
            list.foreach{x=> {
                val item = Profileload(x._1.user_id, x._1.full_name, x._2.avatar, x._2.email)
                  data += item
              }
            }
            Some(data)
          }
        }
      }
    }
  }

  def insert(profileData: ProfileData): Future[Int] = {
    db.run(ProfileTable += profileData)
  }

  def delete(profileId: Int) = {
    db.run(ProfileTable.filter(_.id === profileId).delete)
  }

  def update(profileData: ProfileData) = {
    val q = ProfileTable.filter(_.id === profileData.id)
      .map(p => (p.full_name, p.phone_number, p.birth_date, p.address, p.departmenti_id, p.job_title_id, p.job_position_id, p.status, p.gender, p.updated_at))
      .update(profileData.full_name, profileData.phone_number, profileData.birth_date, profileData.address, profileData.departmenti_id, profileData.job_title_id, profileData.job_position_id, profileData.status, profileData.gender, profileData.updated_at)
    db.run(q)
  }
}
