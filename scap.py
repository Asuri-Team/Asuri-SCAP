import sys
import sqlite3

from config import DATABASE,TITLE
from flask import Flask
from flask import render_template
from flask import redirect

from flask.ext.wtf import Form
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config.from_object('config')

reload(sys)
sys.setdefaultencoding('utf-8')

conn = sqlite3.connect(DATABASE, check_same_thread=False)
cursor = conn.cursor()

class search_form(Form):
    search_type = IntegerField("type", validators=[DataRequired()])
    keyword = StringField("keyword", validators=[DataRequired()])

@app.route('/')
def index():
    sql = "select total_cve,total_cpe,total_cwe from stat_vfeed_kpi"
    cursor.execute(sql)
    stat = cursor.fetchall()

    sql = "select * from stat_new_cve"
    cursor.execute(sql)
    new = cursor.fetchall()

    return render_template('index.html', title=TITLE, new=new, stat=stat)

@app.route('/search', methods = ["GET", "POST"])
def search():
    form = search_form()
    if form.is_submitted():
        if form.search_type.data == 0:
            sql = "select cveid,cpeid from cve_cpe where cveid like '%%%s%%'" % form.keyword.data
        elif form.search_type.data == 1:
            sql = "select cveid,cpeid from cve_cpe where cpeid like '%%%s%%'" % form.keyword.data
        else:
            return redirect('/search')

        cursor.execute(sql)
        result = cursor.fetchall()
        return  render_template('search.html', title=TITLE, result=result, form=form)

    return  render_template('search.html', title=TITLE)

@app.route('/search/<cveid>')
def search_cve(cveid):
    sql = "select cveid,summary,cvss_base,cvss_impact,cvss_exploit,cvss_access_vector,cvss_access_complexity from nvd_db where cveid ='%s'" % cveid
    cursor.execute(sql)
    cve = cursor.fetchall()

    sql = "select cpeid from cve_cpe where cveid = '%s'" % cveid
    cursor.execute(sql)
    cpe = cursor.fetchall()

    sql = "select refsource,refname from cve_reference where cveid = '%s'" % cveid
    cursor.execute(sql)
    refer = cursor.fetchall()

    sql = "select cwetitle from cwe_db where cweid in (select cweid from cve_cwe where cveid ='%s')" % cveid
    cursor.execute(sql)
    cwe = cursor.fetchall()

    return render_template('detail.html', title=TITLE, cve=cve, cpe=cpe, refer=refer, cwe=cwe)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)

    cursor.close()
    conn.close()