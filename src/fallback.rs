use axum::{
    body::Body,
    extract::State,
    http::{Request, Response, StatusCode, Uri},
    response::{IntoResponse, Response as AxumResponse},
};
use leptos::{view, Errors, For, IntoView, LeptosOptions, RwSignal, SignalGet, View};

pub async fn file_and_error_handler(
    uri: Uri,
    State(options): State<LeptosOptions>,
    req: Request<Body>,
) -> AxumResponse {
    let root = options.site_root.clone();
    let res = get_static_file(uri.clone(), &root).await.unwrap();

    if res.status() == StatusCode::OK {
        res.into_response()
    } else {
        let handler =
            leptos_axum::render_app_to_stream(options.to_owned(), || error_template(None));
        handler(req).await.into_response()
    }
}

async fn get_static_file(uri: Uri, root: &str) -> Result<Response<Body>, (StatusCode, String)> {
    let req = Request::builder()
        .uri(uri.clone())
        .body(Body::empty())
        .unwrap();
    // `ServeDir` implements `tower::Service` so we can call it with `tower::ServiceExt::oneshot`
    // This path is relative to the cargo root
    _ = req;
    _ = root;
    todo!()
}

// A basic function to display errors served by the error boundaries. Feel free to do more complicated things
// here than just displaying them
pub fn error_template(errors: Option<RwSignal<Errors>>) -> View {
    let Some(errors) = errors else {
        panic!("No Errors found and we expected errors!");
    };

    view! {
      <h1>"Errors"</h1>
      <For
          // a function that returns the items we're iterating over; a signal is fine
          each=move || errors.get()
          // a unique key for each item as a reference
          key=|(key, _)| key.clone()
          // renders each item to a view
          children= move |(_, error)| {
          let error_string = error.to_string();
            view! {

              <p>"Error: " {error_string}</p>
            }
          }
      />
    }
    .into_view()
}
