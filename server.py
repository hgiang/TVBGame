import tornado.ioloop
import tornado.web

class WebHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("client/index.html")


class QuestionHandler(tornado.web.RequestHandler):
	def get(self):
		message = '[{"title": "future gazer", "artists": "fripSide", "cover": "http://www.multiworldproject.com/media/uploads/covers/coverfile_88.jpeg", "titles": ["Toaru Kagaku no Railgun OVA", "xxxHOLiC Movie", "Planetes", "Higashi no Eden: Gekijouban I The King of Eden"], "anime": "Toaru Kagaku no Railgun OVA", "file": "uploads/songs/85e5ffb1-7c9d-4234-b97e-be0430a0b0b8.mp4", "year": 2010, "type": "OP 1"}, {"title": "Platina", "artists": "Maaya Sakamoto", "cover": "http://www.multiworldproject.com/media/uploads/covers/coverfile_168.jpeg", "titles": ["Cardcaptor Sakura", "Soul Eater", "Welcome to the NHK!", "School Rumble"], "anime": "Cardcaptor Sakura", "file": "uploads/songs/29c9adc9-50d2-4d94-bbcc-a7c4d38f7150.mp4", "year": 1999, "type": "OP 3"}]';
		self.write(message)

if __name__ == "__main__":
    application = tornado.web.Application([
    	(r"/api/newgame", QuestionHandler),
        (r"/", WebHandler),        
        (r"/(.*)", tornado.web.StaticFileHandler, {"path": "client"}),
    ])
    application.listen(8000)
    tornado.ioloop.IOLoop.current().start()