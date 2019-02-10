create table zones (
    id serial,
    abbr varchar() not null,
    description varchar() not null,
    options json not null default '{}'::json
)
