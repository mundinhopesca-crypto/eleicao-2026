// Optional Vercel serverless API. Configure BRAVE_SEARCH_API_KEY in Vercel environment.
module.exports=async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
  const key=process.env.BRAVE_SEARCH_API_KEY;
  if(!key)return res.status(503).json({error:"Search provider not configured",results:[]});
  const q=String(req.query?.q||"").trim();
  if(!q||q.length>180)return res.status(400).json({error:"Invalid query",results:[]});
  try{
    const u="https://api.search.brave.com/res/v1/web/search?count=15&q="+encodeURIComponent(q);
    const r=await fetch(u,{headers:{"Accept":"application/json","X-Subscription-Token":key},signal:AbortSignal.timeout(9000)});
    if(!r.ok)return res.status(502).json({error:"Search provider unavailable",results:[]});
    const body=await r.json();
    const results=(body.web?.results||[]).slice(0,20).map(x=>({title:String(x.title||""),url:String(x.url||""),description:String(x.description||"").replace(/<[^>]*>/g,"").slice(0,400)}));
    res.status(200).json({results});
  }catch{res.status(502).json({error:"Search failed",results:[]})}
}