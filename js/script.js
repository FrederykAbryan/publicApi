function searchMovie() {
	$("#movie-list").html("");

	$.ajax({
		url: "http://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "77139e6a",
			s: $("#search-input").val(),
		},
		success: function (result) {
			if (result.Response == "True") {
				let movies = result.Search;

				$.each(movies, function (i, data) {
					$("#movie-list").append(
						`
					<div class="col-md-3 justify-content-center">
					<div class="card mb-8" style="width: 16rem;">
						  <img src="` +
							data.Poster +
							`" class="card-img-top" alt="...">
						  <div class="card-body">
						<h5 class="card-title">` +
							data.Title +
							`</h5>
						<h6 class="card-text">` +
							data.Year +
							`</h6>
						<a href="#" class="btn-detail">See Detail</a>
						  </div>
						  </div>
					</div>
					`
					);
				});

				$("#search-input").val("");
			} else {
				$("#movie-list").html(
					`<h1 class="text-center">` + result.Error + `</h1>`
				);
			}
		},
	});
}
$("#search-button").on("click", function () {
	searchMovie();
});

$("#search-input").on("keyup", function (e) {
	if (e.keyCode === 13) {
		searchMovie();
	}
});
