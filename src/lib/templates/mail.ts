export function signInTemplate(url: string) {
  return template(url, {
    title: 'Sign in to Slog',
    description: 'Click the link below to sign in your account.',
    buttonText: 'Sign in'
  });
}

export function signUpTemplate(url: string) {
  return template(url, {
    title: 'Create Account in Slog',
    description: 'Click the link below to create your account.',
    buttonText: 'Create Account'
  });
}

function template(
  url: string,
  {
    title,
    description,
    buttonText
  }: { title: string; description: string; buttonText: string }
) {
  return `
	<div
			style="
				height: 100%;
				margin: 0;
				font-family: 'Inter', Helvetica, Arial, sans-serif;
				background-color: #ffffff;
				color: #111111;
				width: 100% !important;
			"
		>
			<table
				width="100%"
				cellpadding="0"
				cellspacing="0"
				role="presentation"
				style="width: 100%; margin: 0; padding: 40px; background-color: #f4f4f4"
			>
				<tbody>
					<tr>
						<td
							align="center"
							style="
								font-family: 'Inter', Helvetica, Arial, sans-serif;
								font-size: 16px;
							"
						>
							<table
								width="100%"
								cellpadding="0"
								cellspacing="0"
								role="presentation"
								style="width: 100%; margin: 0; padding: 0"
							>
								<tbody>
									<tr>
										<td
											width="570"
											cellpadding="0"
											cellspacing="0"
											style="
												font-family: 'Inter', Helvetica, Arial, sans-serif;
												font-size: 16px;
												width: 100%;
												margin: 0;
												padding: 0;
											"
										>
											<table
												class="m_4903502575244239120email-body_inner"
												align="center"
												width="570"
												cellpadding="0"
												cellspacing="0"
												role="presentation"
												style="
													width: 570px;
													margin: 0 auto;
													padding: 0;
													background-color: #ffffff;
												"
											>
												<tbody>
													<tr>
														<td
															style="
																font-family: 'Inter', Helvetica, Arial,
																	sans-serif;
																font-size: 16px;
																padding: 45px;
															"
														>
															<div>
																<h1
																	style="
																		margin-top: 0;
																		color: #333333;
																		font-size: 22px;
																		font-weight: bold;
																		text-align: left;
																	"
																>
																	${title}
																</h1>
																<p
																	style="
																		margin: 0.4em 0 1.1875em;
																		font-size: 16px;
																		line-height: 1.625;
																		color: #51545e;
																	"
																>
																	${description}
																</p>
																<p
																	style="
																		margin: 0.4em 0 1.1875em;
																		font-size: 16px;
																		line-height: 1.625;
																		color: #51545e;
																	"
																>
																	<a
																		href="${url}"
																		class="m_4903502575244239120button"
																		style="
																			color: #ffffff;
																			background-color: #111111;
																			border-top: 10px solid #111111;
																			border-right: 18px solid #111111;
																			border-bottom: 10px solid #111111;
																			border-left: 18px solid #111111;
																			display: inline-block;
																			text-decoration: none;
																			border-radius: 3px;
																			box-sizing: border-box;
																		"
																		target="_blank"
																		>${buttonText}</a
																	>
																</p>
																<p
																	style="
																		margin: 0.4em 0 1.1875em;
																		font-size: 16px;
																		line-height: 1.625;
																		color: #51545e;
																	"
																>
																	This link expires in 24 hours and can only be
																	used once.
																</p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
  `;
}
