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

case class Profileload(  user_id: Int, full_name: String, avatar: String,email: String,department_id: Int,department: String,job_title_id: Int,title: String)
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

  def department_id = column[Int]("department_id")

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
    (id, user_id, full_name, phone_number, birth_date, address, department_id, job_title_id, job_position_id, status, join_date, gender, created_at, updated_at, created_by, updated_by) <> ((ProfileData.apply _).tupled, ProfileData.unapply)
}

class Profile @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val ProfileTable = TableQuery[ProfileTableDef]
  private val jobPosition = TableQuery[JobPositionDef]
  private val jobTitle = TableQuery[TitleTableDef]
  private val user = TableQuery[UserTableDef]
  private val depart = TableQuery[DepartmentTableDef]
  def getProfile(id: Int) = {
    val query = ((ProfileTable) join user on (_.id === _.id)).filter(_._1.user_id === id).result
    val rs = db.run(query)
    val rs1 = db.run(jobPosition.result)
    val rs2 = db.run(jobTitle.result)
    val rs3 = db.run(depart.result)
    for{
      fs <- rs
      fs1 <- rs1
      fs2 <- rs2
      fs3 <- rs3
    }yield {
      fs.size match{
        case 0 => None
        case _ => {
          val (((profile),avatar),email) = ((fs.head._1,fs.head._2.avatar),fs.head._2.email)
          Some(profile,avatar,email,fs1,fs2,fs3)
        }
      }
    }
  }

  def loadProfile = {
    val query = (((((ProfileTable join jobPosition on (_.job_position_id === _.id)) join jobTitle on (_._1.job_title_id === _.id)) join user) on (_._1._1.user_id === _.id))  ).result

    val rs = db.run(query)
    rs.map{
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val data = ListBuffer.empty[Profileload]
            list.foreach{x=> {
                val item = Profileload(x._1._1._1.user_id, x._1._1._1.full_name, x._2.avatar, x._2.email,x._1._1._1.departmenti_id,x._1._1._2.title,x._1._2.id,x._1._2.title)
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
      .map(p => (p.full_name, p.phone_number, p.birth_date, p.address, p.department_id, p.job_title_id, p.job_position_id, p.status, p.gender, p.updated_at))
      .update(profileData.full_name, profileData.phone_number, profileData.birth_date, profileData.address, profileData.departmenti_id, profileData.job_title_id, profileData.job_position_id, profileData.status, profileData.gender, profileData.updated_at)
    db.run(q)
  }
}
