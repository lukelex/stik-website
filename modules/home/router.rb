require 'sinatra'
require 'slim'
require 'stylus'
require 'stylus/tilt'

class Stik::Home < Sinatra::Base
  get '/assets/*.*' do |file, ext|
    case ext
    when 'css'
      stylus File.read(File.join(__dir__, "assets/#{file}.styl"))
    when 'js'
      send_file File.read(File.join(__dir__, "assets/#{file}.js"))
    end
  end

  get '/?' do
    view_str = File.read File.join(__dir__, 'views/readme.md')
    @readme = Markdown.render view_str
    slim :layout
  end
end
