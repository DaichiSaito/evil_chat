# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

# この行を追加
Rake::Task.define_task("assets:precompile" => ["yarn:install", "webpacker:compile"])

Rails.application.load_tasks
