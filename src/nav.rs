use leptos::*;

use crate::icons;

#[component]
pub(super) fn Nav() -> impl IntoView {
    view! {
        <a href="#bsky" class="icon-link no-underline">
            <icons::BSkyIcon class="adaptive-icon".to_string() />
        </a>
        <a href="#mastodon" class="icon-link no-underline">
            <icons::MastodonIcon class="adaptive-icon".to_string() />
        </a>
        <a href="#itch" class="icon-link no-underline">
            <icons::ItchIcon class="adaptive-icon".to_string() />
        </a>
        <a href="#github" class="icon-link no-underline">
            <icons::GithubIcon class="adaptive-icon".to_string() />
        </a>
        <a href="#email" class="icon-link no-underline">
            <icons::EmailIcon class="adaptive-icon".to_string() />
        </a>
    }
}
