// module.exports 는 모듈을 생성하는 부분으로 다른 파일에서 require 할 수 있다.
module.exports = function(app, db)
{

    // 테스트 메인 화면
	app.get('/',function(req,res){
		res.render('index', {
			title: "Crash Event 관리"
		});
	});

    // 리스트 조회
    app.get('/list', function (req, res) {
        console.log('/list');

		var crash_data = db.crashs.find();
		console.log( crash_data );
		res.json(crash_data);

    });

    // 한건 조회
    app.get('/getEvent/:eventid', function(req, res){
        console.log('/getEvent/:eventid');

		// GET 방식은 req.query 를 사용하여 파라미터 정보 취득
        var eventid = req.query.eventid;
		
		//var crash_data = db.crashs.find({eventid: eventid});
		var crash_data = db.crashs.find({'eventid': eventid});
		console.log( crash_data[0] );
		res.json(crash_data[0]);

    });

    // 등록
    app.post('/addEvent/:eventid', function(req, res){
        console.log('/addEvent/:eventid');

        var result = {  };
		// POST 방식은 req.body 를 사용하여 파라미터 정보 취득
        var eventid = req.body.eventid;

		console.log(req.body);
		db.crashs.save(req.body);
		//result = {"success": 1};
		result["success"] = 1;
		res.json(result);

    });


    // 수정(등록)
    app.put('/mergeEvent/:eventid', function(req, res){
        console.log('/mergeEvent/:eventid');

        var result = {  };
		// PUT 방식은 req.body 를 사용하여 파라미터 정보 취득
        var eventid = req.body.eventid;

		var old_crash_data = db.crashs.find({'eventid': eventid});
		console.log( old_crash_data[0] );
		console.log( req.body );
		
		var options = {
			multi: false, // update multiple - default false 
			upsert: true // if object is not found, add it (update-insert) - default false 
		};

		var rst = db.crashs.update(old_crash_data[0], req.body, options);
		console.log(rst.updated+'/'+rst.inserted); // { updated: 1, inserted: 0 }
		if(rst.updated == 1){
			result["success"] = 1;
            result["message"] = "updated !!";
		} else if(rst.inserted == 1){
			result["success"] = 1;
            result["message"] = "inserted !!";
		} else {
			result["success"] = 0;
            result["error"] = "동일한 ID가 없습니다.";
		}

        res.json(result);

    });

    // 삭제
    app.delete('/deleteEvent/:eventid', function(req, res){
        console.log('/deleteEvent/:eventid');

        var result = { };
		// DELETE 방식은 req.body 를 사용하여 파라미터 정보 취득
        var eventid = req.body.eventid;
		
		db.crashs.remove({'eventid': eventid});
		result["success"] = 1;
		res.json(result);

    });

    // 등록되지 않은 패스에 대해 페이지 오류 응답
    app.all('*', function (req, res) {
        res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
    });


}
