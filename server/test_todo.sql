drop table if exists task;

create table task {
    id serial primary key,
    description varchat(255) not null
};

insert into task (description) values ("My new test task");
insert into task (description) values ("My other test task");