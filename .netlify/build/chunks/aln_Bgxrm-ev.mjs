const alnImg = new Proxy({"src":"/_astro/aln.CTOZHoq1.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/assets/images/aln.png";
							}
							
							return target[name];
						}
					});

export { alnImg as a };
