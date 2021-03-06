package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

// ModelAccess 模块(表)操作权限
type ModelAccess struct {
	ID           int64         `orm:"column(id);pk;auto"` //主键
	CreateUserID int64         `orm:"column(create_user_id);null"`         //创建者
	UpdateUserID int64         `orm:"column(update_user_id);null"`         //最后更新者
	CreateDate   time.Time     `orm:"auto_now_add;type(datetime)"`         //创建时间
	UpdateDate   time.Time     `orm:"auto_now;type(datetime)"`             //最后更新时间
	Module       *ModuleModule `orm:"rel(fk)"`                                      //模块(表)
	Group        *BaseGroup    `orm:"rel(fk)"`                                      //权限组
	PermCreate   bool          `orm:"default(true)"`                                //创建权限
	PermUnlink   bool          `orm:"default(false)"`                               //删除权限
	PermWrite    bool          `orm:"default(true)"`                                //修改权限
	PermRead     bool          `orm:"default(true)"`                                //读权限

}

func init() {
	orm.RegisterModel(new(ModelAccess))
}

// AddModelAccess insert a new ModelAccess into database and returns last inserted Id on success.
func AddModelAccess(m *ModelAccess, ormObj orm.Ormer) (id int64, err error) {
	id, err = ormObj.Insert(m)
	return
}

// UpdateModelAccess update ModelAccess into database and returns id on success
func UpdateModelAccess(m *ModelAccess, ormObj orm.Ormer) (id int64, err error) {
	if _, err = ormObj.Update(m); err == nil {
		id = m.ID
	}
	return
}
