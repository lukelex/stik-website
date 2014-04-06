require 'sinatra'

class Stik::Docs < Sinatra::Base
  get '/assets/*.*' do |file, ext|
    case ext
    when 'css'
      stylus read_asset_file("#{file}.styl")
    when 'js'
      send_file File.join(__dir__, "assets/#{file}.js")
    end
  end

  get '/docs/?' do
    slim :docs_layout, locals: {
      md_view: Markdown.render(read_view_file('main'))
    }
  end

  get '/docs/:view/?' do |view|
    if params[:partial] == 'true'
      Markdown.render(read_view_file(view))
    else
      slim :docs_layout, locals: {
        md_view: Markdown.render(read_view_file(view))
      }
    end
  end

  private
  def read_asset_file(file)
    File.read File.join(__dir__, "assets/#{file}")
  end

  def read_view_file(file)
    File.read File.join(__dir__, "views/#{file}.md")
  end
end

module Markdown
  require 'github/markdown'

  def self.render(view_str)
    wrap GitHub::Markdown.render(view_str)
  end

  private
  def self.wrap(md)
    '<div class="gh-markdown">' + md + '</div>'
  end
end
