import handlebars from 'handlebars';
import fs from 'fs';

export async function parse({
  file,
  variables,
}){
  const templateFileContent = await fs.promises.readFile(file, {
    encoding: 'utf-8',
  });
  const parseTemplate = handlebars.compile(templateFileContent);

  return parseTemplate(variables);
}
