require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)
task default: :spec

task :server do
  exec 'bundle exec rackup application.rb'
end