> 注解：

- {
 pagenum:页码,limit：条数,pageNum=1&limit=10
}

- 搜索界面：'page/search.html'

> 书城：'/book/index'
- {
    items:{
        data:[{
            authors:作者,
            cover:图片,
            fiction_id:文章id,
            title:书名
        }]
    }
}

> 书架：'/book/index'
- {
    items:{
        data:[{
            authors:作者,
            cover:图片,
            fiction_id:文章id,
            title:书名
        }]
    }
}

> 搜索界面：'/book/search'
- {
    items:{
        data:[{
            authors:作者,
            cover:图片,
            fiction_id:文章id,
            title:书名
        }]
    }
}

> 详情界面：'/book/detail'
- {
    item:{
        authors:作者,
        cover:图片,
        latest：最新章节
        fiction_id:文章id,
        title:书名,
        content:详情介绍
    },
    author_books:{
        title:书名,
        cover:图片,
        rights:来自
    }
}

> 目录：'/book/search'
- {
    item:{
         title: 书名,
        toc:[{
            chapter_id:章节id,
            title:章节
        }]
    }
}

> 阅读界面：'/book/reader'


