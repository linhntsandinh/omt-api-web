package models

import slick.lifted.{TableQuery, Tag}
import slick.jdbc.MySQLProfile.api._
import slick.jdbc.JdbcProfile
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}

import scala.concurrent.{ExecutionContext, Future}
import javax.inject.Inject
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS


case class TitleData(id: Int, title: String)
object TitleData {
  implicit val reader = Json.reads[TitleData]
  implicit val writer = Json.writes[TitleData]

}
class TitleTableDef(tag: Tag) extends Table[TitleData](tag, "job_title") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def title = column[String]("title")
  override def * =
    (id, title) <> ((TitleData.apply _).tupled, TitleData.unapply)
}
class JobTitle@Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                     (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val TitleTable = TableQuery[TitleTableDef]

  def insert(titleData: TitleData): Future[Result] = {
    db.run(TitleTable += titleData)
    Future(JS.OK("data" -> "Insert Success!!"))
  }

  def delete(titlelogId: Int): Future[Result] = {
    db.run(TitleTable.filter(_.id === titlelogId).delete)
    Future(JS.OK("data" -> "Delete Success!!"))
  }

  def update(titleData: TitleData)={
    val q = TitleTable.filter(_.id === titleData.id)
      .map(p => (p.id,p.title))
      .update((titleData.id,titleData.title))
    db.run(q)
    Future(JS.OK("data" -> "update Success!!"))
  }

}
