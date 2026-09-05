import express from 'express';
import path from 'path';
import fs from 'fs';
import Article from '../types/article';
const filePath = path.join(process.cwd(), 'data', 'articles.json');
const router = express.Router();

function getArticles(): Article[] {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  const articles = getArticles();

  res.render('articles/index', { title: 'Personal Blog', articles });
});

router.get('/new', function (req, res, next) {
  let article: Article = {
    id: 0,
    title: '',
    content: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  res.render('articles/new', { title: 'New Article', article });
});

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  const articleId = req.params.id;

  const articles = getArticles();
  const article = articles.find((a: Article) => a.id === Number(articleId));

  res.render('articles/show', { article });
});

router.get('/edit/:id', function (req, res, next) {
  const articleId = req.params.id;
  const articles = getArticles();
  const article = articles.find((a: Article) => a.id === Number(articleId));
  res.render('articles/edit', { title: 'Update Article', article });
});

router.post('/update/:id', function (req, res) {
  const articleId = Number(req.params.id);
  const articles = getArticles();
  const article = articles.find((a: Article) => a.id === articleId);

  if (!article) {
    return res.status(404).send('Article not found');
  }

  const { title, content } = req.body;
  article.title = title;
  article.content = content;
  article.updated_at = new Date().toISOString();

  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  res.redirect(`/articles/${articleId}`);
});

router.delete('/delete/:id', function (req, res, next) {
  const articleId = req.params.id;
  let articles = getArticles();
  articles = articles.filter((a: Article) => a.id !== Number(articleId));
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  res.json({ message: 'Article deleted successfully' });
});

router.post('/create', function (req, res, next) {
  let articles = getArticles();
  const { title, content } = req.body;

  const newArticle: Article = {
    id: articles.length > 0 ? articles[articles.length - 1].id + 1 : 1,
    title,
    content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  articles.push(newArticle);
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  res.redirect(`/articles/${newArticle.id}`);
});

export default router;
