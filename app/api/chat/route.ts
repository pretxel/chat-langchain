import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers),
  });

  const loader = new TextLoader("docs/summary.txt");

  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const memory = new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    llm,
    vectorStore.asRetriever(),
    {
      memory,
    }
  );

  chain
    .call({
      question: messages.at(-1).content,
    })
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
