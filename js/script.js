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
							<a href="#" style="text-decoration: none" class="card-link btn-detail" data-bs-toggle="modal"
								data-bs-target="#staticBackdrop" data-id='` +
							data.imdbID +
							`'>See Detail</a>
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

$("#movie-list").on("click", ".btn-detail", function () {
	$.ajax({
		url: "http://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "77139e6a",
			i: $(this).data("id"),
		},
		success: function (movie) {
			if (movie.Response === "True") {
				$(".modal-body").html(
					`
				<div class="container-fluid">
				<div class="row">
				<div class="col-md-4">
				<img src="` +
						movie.Poster +
						`" class="img-fluid">
				</div>

				<div class="col-md-8">
				<ul class="list-group">
				<li class="list-group-item"><h3>` +
						movie.Title +
						`</h3></li>
				<li class="list-group-item">` +
						movie.Genre +
						`</li>
				<li class="list-group-item">` +
						movie.Plot +
						`</li>
				<li class="list-group-item">` +
						movie.Actors +
						`</li>
				<li class="list-group-item">` +
						movie.Rated +
						`</li>
				</ul>

				</div>
				</div>
				</div>
				`
				);
			}
		},
	});
});
